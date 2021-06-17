import React from "react";

export default class ScrollToTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
    // this.ScrollToTop = this.scrollToTop.bind(this);
    // this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  scrollToTop() {
    document.querySelector("#root").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // useEffect(() => {
  //   // Button is displayed after scrolling for 500 pixels
  //   const toggleVisibility = () => {
  //     if (window.pageYOffset > 500) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   };

  //   window.addEventListener('scroll', toggleVisibility);

  //   return () => window.removeEventListener('scroll', toggleVisibility);
  // }, []);
  render() {
    return (
      <>
        <div
          className="scroll-to-top"
          onClick={() => {
            this.scrollToTop();
          }}
        >
          <i className="fas fa-arrow-up"></i>
        </div>
      </>
    );
  }
}
