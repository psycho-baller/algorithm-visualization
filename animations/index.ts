
export const animations = {
    variants: {
        initial: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        }
    },
}
