/**
 * Shared smooth-scroll helper used by Header and HeroSection.
 * Scrolls to a page section by id, accounting for the fixed header offset.
 */
export function scrollToSection(
  id: string,
  e?: React.MouseEvent | React.KeyboardEvent
) {
  e?.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
}
