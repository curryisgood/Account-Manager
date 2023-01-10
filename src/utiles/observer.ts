const assignObserver = (targetEl: Element | null, action: Function) => {
  if (!targetEl) {
    return;
  }

  let observer = new MutationObserver(() => {
    action();
  });

  observer.observe(targetEl, {
    attributes: true,
    childList: true,
    characterData: true,
  });
};

export default assignObserver;
