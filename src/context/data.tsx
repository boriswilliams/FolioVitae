import { load } from 'js-yaml';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { prettifyError, ZodObject, type infer as Infer } from 'zod';

const extensions = ['yml', 'yaml'];

export function createDataContext<S extends ZodObject>(name: string, schema: S) {

  type T = Infer<S>;

  const DataContext = createContext<T | null>(null);

  function useData(): T | null {
    return useContext(DataContext);
  }

  type DataProviderProps = {
    children: ReactNode;
  };

  function DataProvider({ children }: DataProviderProps) {
    
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
      (async () => {
        
        let url!: URL;
        let response!: Response;

        for (const ext of extensions) {
          url = new URL(`${name}.${ext}`, document.baseURI);
          response = await fetch(url);
          if (response.status !== 404)
            break;
        }
        
        if (response.status === 404)
          return;

        if (!response.ok)
          throw new Error(`Could not load ${url} (${response.status} ${response.statusText})`);

        const yaml = await response.text();
        const source = String(url);

        let data: unknown;
        try {
          data = load(yaml, { filename: source });
        } catch (error) {
          throw new Error(`Could not parse ${source}`, { cause: error });
        }

        const result = schema.safeParse(data);
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(`Invalid ${name} in ${source}:\n${prettifyError(result.error)}`);
        }
      })();
    }, []);

    return (
      <DataContext value={data}>
        {children}
      </DataContext>
    );
  }

  return { DataProvider, useData };
}
