import gsap from 'gsap';

export const animateMenuOpen = (
  menuRef: HTMLElement | null,
  menuItemsRef: (HTMLElement | null)[]
) => {
  if (!menuRef) return;

  // Animate menu container
  gsap.fromTo(
    menuRef,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
  );

  // Animate menu items staggered
  gsap.fromTo(
    menuItemsRef.filter(Boolean), // Filter out null values
    { opacity: 0, x: -20 },
    { 
      opacity: 1, 
      x: 0, 
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.2
    }
  );
};

export const animateMenuClose = (
  menuRef: HTMLElement | null,
  menuItemsRef: (HTMLElement | null)[]
) => {
  if (!menuRef) return;

  // Animate menu container out
  gsap.to(menuRef, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: 'power2.in'
  });

  // Animate menu items out
  gsap.to(menuItemsRef.filter(Boolean), {
    opacity: 0,
    x: -10,
    duration: 0.2,
    stagger: 0.05,
    ease: 'power2.in'
  });
};
