const MOBILE_BREAKPOINT = 640;

function rectsIntersect(
  a: { top: number; bottom: number },
  b: { top: number; bottom: number },
): boolean {
  return a.top < b.bottom && a.bottom > b.top;
}

function getNavIntersectionBand(): { top: number; bottom: number } | null {
  if (typeof window === 'undefined') return null;

  const header = document.querySelector('.mobileHeader') as HTMLElement | null;
  if (!header?.offsetHeight) return null;

  const headerHeight = header.offsetHeight;
  const vvph = window.visualViewport?.height ?? window.innerHeight;
  const root = document.querySelector('#smooth-wrapper');
  const rootRect = root
    ? root.getBoundingClientRect()
    : { top: 0, bottom: vvph };

  return {
    top: rootRect.top + headerHeight * 0.5,
    bottom: rootRect.bottom - (vvph - headerHeight * 0.5 - 1),
  };
}

export function applyNavLightState(isLight: boolean): void {
  const nav = document.querySelector('.mainNav') as HTMLElement | null;
  const mobileHeader = document.querySelector('.mobileHeader') as HTMLElement | null;

  if (isLight) {
    nav?.setAttribute('data-isLight', 'true');
    mobileHeader?.setAttribute('data-isLight', 'true');
  } else {
    nav?.removeAttribute('data-isLight');
    mobileHeader?.removeAttribute('data-isLight');
  }
}

export function getCurrentNavLightState(): boolean {
  return document.querySelector('.mobileHeader')?.hasAttribute('data-isLight') ?? false;
}

/** Mirrors Layout's intersection band at scroll top; null if layout isn't ready. */
export function getTrivialNavLightState(): boolean | null {
  if (typeof window === 'undefined' || window.innerWidth > MOBILE_BREAKPOINT) return null;

  const band = getNavIntersectionBand();
  if (!band) return null;

  const darkElements = document.querySelectorAll('.darkElement');
  if (darkElements.length === 0) return false;

  let sawLaidOutElement = false;

  for (const el of darkElements) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    sawLaidOutElement = true;
    if (rectsIntersect(rect, band)) {
      return true;
    }
  }

  if (!sawLaidOutElement) return null;

  return false;
}

export function clearPendingNavStateTimeout(): void {
  const timeout = (window as Window & { _navStateTimeout?: ReturnType<typeof setTimeout> })._navStateTimeout;
  if (timeout) {
    clearTimeout(timeout);
    (window as Window & { _navStateTimeout?: ReturnType<typeof setTimeout> })._navStateTimeout = undefined;
  }
}

/** Apply data-isLight before nav close when the new page state is trivially known and differs. */
export function syncNavLightStateIfTrivialChange(): boolean {
  const next = getTrivialNavLightState();
  if (next === null) return false;

  const current = getCurrentNavLightState();
  if (next === current) return false;

  clearPendingNavStateTimeout();
  applyNavLightState(next);
  return true;
}
