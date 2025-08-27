import type { CO2Data } from '../types/types';

function loadCO2InWorker(url: string): Promise<CO2Data> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('../workers/co2Worker.ts', import.meta.url),
      {
        type: 'module',
      }
    );

    worker.onmessage = (
      e: MessageEvent<{ ok: boolean; data?: CO2Data; error?: string }>
    ) => {
      if (e.data.ok) resolve(e.data.data!);
      else reject(new Error(e.data.error || 'Worker parse failed'));
      worker.terminate();
    };

    worker.onerror = (e) => {
      reject(e);
      worker.terminate();
    };

    worker.postMessage(url);
  });
}

type Resource<T> = { read(): T };

let cachedResource: Resource<CO2Data> | null = null;

export function createCO2Resource(url: string): Resource<CO2Data> {
  if (cachedResource) return cachedResource;

  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: CO2Data | Error;
  const suspender = loadCO2InWorker(url)
    .then((data) => {
      status = 'success';
      result = data;
    })
    .catch((err) => {
      status = 'error';
      result = err as Error;
    });

  cachedResource = {
    read(): CO2Data {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result as CO2Data;
    },
  };

  return cachedResource;
}
