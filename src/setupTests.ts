(global as any).requestAnimationFrame = function(callback: any) {
  setTimeout(callback, 0);
};
