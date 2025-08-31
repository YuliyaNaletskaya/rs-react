self.onmessage = async (e: MessageEvent<string>) => {
  try {
    const url = e.data;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const text = await res.text();
    const data = JSON.parse(text);
    (self as unknown as Worker).postMessage({ ok: true, data });
  } catch (err) {
    (self as unknown as Worker).postMessage({ ok: false, error: String(err) });
  }
};

export {};
