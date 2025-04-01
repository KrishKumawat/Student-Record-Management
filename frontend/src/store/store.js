import { create } from "zustand";

// FormStore
export const useFormStore = create((set) => ({
    formValues: {},
    setFormField: (fieldName, value) => {
        set((state) => ({
            formValues: {
                ...state.formValues,
                [fieldName]: value,
            },
        }));
    },
}));

// UserStore
export const useUserStore = create((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => set({ user }),
    setIsLoading: (isLoading) => set({ isLoading }),
}));
