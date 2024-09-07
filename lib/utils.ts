import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (endpoint: string) => {
  const response = await fetch(`${process.env.API_PATH}/api/${endpoint}`);
  return response.json();
};
