import { create } from "zustand"

const navigationManagement = create((set) => ({
    isTransitioning: false,
    targetPath: null,

    startTransition: (path) => {
        set({
            isTransitioning: true,
            targetPath: path,
        })
    },

    endTransition: () => set({
        isTransitioning: false,
        targetPath: null,
    })
}))

export default navigationManagement