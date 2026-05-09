import { useCallback, useEffect, useRef, useState } from "react";
import { RequestState } from "../../types";
import { request } from "../../api/client";

const DEFAULT_OPTIONS: RequestInit = {};

export const useFetch = <T>(
  url: string,
  options: RequestInit = DEFAULT_OPTIONS
) => {
  const [state, setState] = useState<RequestState<T>>({ status: "idle" });
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async () => {
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setState({ status: "loading" });

    try {
      const result = await request<T>(url, {
        ...options,
        signal: controller.signal,
      });

      if (controller.signal.aborted) {
        return;
      }

      setState({ status: "success", data: result });
    } catch (error: unknown) {
      if (controller.signal.aborted) {
        return;
      }

      setState({
        status: "error",
        error: {
          message: (error as Error).message || "Ошибка загрузки",
        },
      });
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  }, [url, options]);

  useEffect(() => {
    execute();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [execute]);

  return { ...state, refetch: execute };
};
