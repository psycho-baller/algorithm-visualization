
export const animations = {
  insert: {
    initial: {
      opacity: 0,
      y: -10,
      x: -3,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      x: -3,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
  delete: {
    initial: {
      opacity: 0,
      y: -10,
      x: -1.5,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      x: -1.5,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
  search: {
    initial: {
      opacity: 0,
      y: -10,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
  increment: {
    initial: {
      opacity: 0,
      y: -10,
      x: 1.5,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      x: 1.5,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  },
};
