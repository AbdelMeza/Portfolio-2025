import { create } from "zustand"

const themeManagement = create((set) => ({
    activeTheme: "ligth",

    setTheme: (theme) => {
        set({ activeTheme: theme })
    }
}))

export default themeManagement