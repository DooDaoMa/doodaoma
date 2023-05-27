import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { TbMoonStars, TbSun } from 'react-icons/tb'

export const ChangeThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<string>('')

  useEffect(() => {
    if (systemTheme && theme) {
      setCurrentTheme(theme === 'system' ? systemTheme : theme)
    }
  }, [])

  const onChangeTheme = () => {
    if (currentTheme === 'dark') {
      setCurrentTheme('light')
      setTheme('light')
    } else {
      setTheme('dark')
      setCurrentTheme('dark')
    }
  }

  return currentTheme === 'dark' ? (
    <TbMoonStars
      className="h-6 w-6 cursor-pointer text-slate-100"
      onClick={() => onChangeTheme()}
    />
  ) : (
    <TbSun
      className="h-6 w-6 cursor-pointer text-blue-600"
      onClick={() => onChangeTheme()}
    />
  )
}
