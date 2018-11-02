const color = '#943838'
const loadCss = `
.heart {
  display: inline-block;
  width: 64px;
  height: 64px;
  transform: rotate(45deg);
  transform-origin: 32px 32px;
  position: fixed;
  top: 40%;
  left: calc(50% - 32px);
}
.heart div {
  top: 23px;
  left: 19px;
  position: absolute;
  width: 26px;
  height: 26px;
  background: ${color};
  animation: heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.heart div:after,
.heart div:before {
  content: " ";
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  background: ${color};
}
.heart div:before {
  left: -17px;
  border-radius: 50% 0 0 50%;
}
.heart div:after {
  top: -17px;
  border-radius: 50% 50% 0 0;
}
@keyframes heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}
`

export default loadCss
