document.onclick = () => cc(event);

function cc(e) {
  const click = document.createElement("div");

  click.className = "click";
  document.body.appendChild(click);

  click.style.left = `${e.clientX}px`;
  click.style.top = `${e.clientY}px`;
  click.style.zIndex = 5000;

  click.style.animation = "clickef-effect .4s  linear";
  click.onanimationend = () => document.body.removeChild(click);
}
