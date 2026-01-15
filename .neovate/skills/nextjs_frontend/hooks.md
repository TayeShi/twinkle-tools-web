# 自定义 Hooks

## useAuth

```tsx
// hooks/useAuth.ts
'use client'

import { useEffect, useState } from 'react'

export interface User {
  id: number
  email: string
  name?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const { token, user } = await response.json()
    localStorage.setItem('token', token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, loading, login, logout }
}
```

## useDebounce

```tsx
// hooks/useDebounce.ts
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

// 使用
'use client'

import { useDebounce } from '@/hooks/useDebounce'

export default function SearchInput() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery) {
      // 执行搜索
      search(debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="搜索..."
    />
  )
}
```

## useLocalStorage

```tsx
// hooks/useLocalStorage.ts
'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    const item = window.localStorage.getItem(key)
    if (item) {
      try {
        setStoredValue(JSON.parse(item))
      } catch (e) {
        setStoredValue(initialValue)
      }
    }
  }, [key, initialValue])

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}

// 使用
const [theme, setTheme] = useLocalStorage('theme', 'light')
```

## useFetch

```tsx
// hooks/useFetch.ts
'use client'

import { useState, useEffect } from 'react'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setData(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return { data, loading, error }
}

// 使用
const { data: articles, loading } = useFetch<Article[]>('/api/articles')
```

## useMediaQuery

```tsx
// hooks/useMediaQuery.ts
'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    media.addEventListener('change', listener)

    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

// 使用
const isMobile = useMediaQuery('(max-width: 768px)')
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
```

## usePagination

```tsx
// hooks/usePagination.ts
import { useState } from 'react'

export function usePagination(totalItems: number, itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    nextPage,
    prevPage,
    goToPage,
  }
}

// 使用
const { currentPage, totalPages, nextPage, prevPage, goToPage } =
  usePagination(totalArticles, 10)
```

## useClickOutside

```tsx
// hooks/useClickOutside.ts
'use client'

import { useEffect, RefObject } from 'react'

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler()
    }

    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}

// 使用
const modalRef = useRef<HTMLDivElement>(null)
useClickOutside(modalRef, () => setIsOpen(false))
```

## useToggle

```tsx
// hooks/useToggle.ts
import { useState } from 'react'

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = () => setValue((prev) => !prev)
  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)

  return { value, setValue, toggle, setTrue, setFalse }
}

// 使用
const { value: isOpen, toggle, setFalse: close } = useToggle(false)
```

## useClipboard

```tsx
// hooks/useClipboard.ts
'use client'

import { useState } from 'react'

export function useClipboard(text: string, timeout = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    } catch (err) {
      console.error('复制失败', err)
    }
  }

  return { copied, copy }
}

// 使用
const { copied, copy } = useClipboard(url)
```

## useWindowSize

```tsx
// hooks/useWindowSize.ts
'use client'

import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// 使用
const { width } = useWindowSize()
const isMobile = width < 768
```

## useSearchParams

```tsx
// hooks/useSearchParams.ts
'use client'

import { useSearchParams as useNextSearchParams } from 'next/navigation'

export function useSearchParams() {
  const searchParams = useNextSearchParams()

  const getParam = (key: string) => searchParams.get(key)

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    window.history.pushState(null, '', `?${params.toString()}`)
  }

  return { getParam, setParam, removeParam }
}
```
