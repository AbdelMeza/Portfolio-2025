import { create } from "zustand"

const menuManagement = create((set, get) => ({
    isOpened: false,

    changeMenuState: () => set({ isOpened: !get().isOpened }),
    setMenuState: (value) => set({ isOpened: value }),
}))

export default menuManagement