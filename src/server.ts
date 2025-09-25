import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

export function encodeArrayJoin(str: string): string {
  if (!str) return "";
  const parts: Array<string> = [];
  let count = 1;
  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) count++;
    else {
      parts.push(str[i - 1], String(count));
      count = 1;
    }
  }
  parts.push(str[str.length - 1], String(count));
  return parts.join("");
}

export function encodeConcat(str: string): string {
  if (!str) return "";
  let out = "";
  let count = 1;
  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) count++;
    else {
      out += str[i - 1] + count;
      count = 1;
    }
  }
  out += str[str.length - 1] + count;
  return out;
}

export function encodeRegex(str: string): string {
  if (!str) return "";
  const runs = str.match(/(.)\1*/g) ?? [];
  return runs.map((run) => run[0] + run.length).join("");
}

type Method = "array" | "concat" | "regex";
function dispatch(str: string, method: Method = "array"): string {
  switch (method) {
    case "array":
      return encodeArrayJoin(str);
    case "concat":
      return encodeConcat(str);
    case "regex":
      return encodeRegex(str);
    default:
      throw new Error(`Unknown method ${( method as unknown ) as string}`);
  }
}

app.get("/", (_req: Request, res: Response) => {
  res.send("Run Length Encoding TS server is up");
});

app.post("/encode", (req: Request, res: Response) => {
  const { input, method } = req.body as { input?: string; method?: Method };
  if (typeof input !== "string") {
    return res.status(400).json({ error: "Input must be a string" });
  }
  try {
    const encoded = dispatch(input, method ?? "array");
    res.json({ input, method: method ?? "array", encoded });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: msg });
  }
});

app.post("/benchmark", (req: Request, res: Response) => {
  const { input, iterations = 5 } = req.body as { input?: string; iterations?: number };
  if (typeof input !== "string") {
    return res.status(400).json({ error: "Input must be a string" });
  }
  const methods: Method[] = ["array", "concat", "regex"];
  const results: Record<string, number> = {};

  methods.forEach((m) => dispatch(input, m));

  for (const m of methods) {
    let sum = 0;
    for (let i = 0; i < iterations; i++) {
      const t0 = performance.now();
      dispatch(input, m);
      sum += performance.now() - t0;
    }
    results[m] = sum / iterations;
  }
  res.json({ iterations, msAvg: results });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
