import { ASSISTANT_API_URL } from '@/shared/lib/constants';
import type { Experience, Project } from '@/payload-types';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

interface ChatDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useChatProjects() {
  const [state, setState] = useState<ChatDataState<Project[]>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const locale = useLocale();

  useEffect(() => {
    let isMounted = true;
    fetch(`${ASSISTANT_API_URL}/portfolio/projects?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setState({ data, isLoading: false, error: null });
      })
      .catch((error) => {
        if (isMounted) setState({ data: null, isLoading: false, error });
      });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  return state;
}

export function useChatExperience() {
  const [state, setState] = useState<ChatDataState<Experience[]>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const locale = useLocale();

  useEffect(() => {
    let isMounted = true;
    fetch(`${ASSISTANT_API_URL}/portfolio/experience?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setState({ data, isLoading: false, error: null });
      })
      .catch((error) => {
        if (isMounted) setState({ data: null, isLoading: false, error });
      });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  return state;
}
