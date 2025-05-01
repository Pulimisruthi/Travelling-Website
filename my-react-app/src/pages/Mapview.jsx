import React from "react";
import "./Mapview.css";

// Callback returns the state name
const IndiaMap = ({ onStateClick }) => (
  <svg
    viewBox="0 0 1000 1000"
    className="india-svg"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Uttar Pradesh */}
    <path
      id="UP"
      className="state-path"
      d="M 663.5 318.5 L 651.5 334.5 L 659.5 356.5 L 646.5 365.5 L 647.5 379.5 L 662.5 390.5 L 662.5 404.5 L 677.5 410.5 L 680.5 426.5 L 693.5 428.5 L 701.5 417.5 L 713.5 419.5 L 719.5 407.5 L 728.5 413.5 L 735.5 406.5 L 741.5 412.5 L 749.5 407.5 L 753.5 393.5 L 749.5 385.5 L 753.5 371.5 L 747.5 361.5 L 749.5 351.5 L 741.5 344.5 L 736.5 332.5 L 726.5 331.5 L 719.5 319.5 L 707.5 324.5 L 700.5 315.5 L 687.5 317.5 L 678.5 309.5 Z"
      onClick={() => onStateClick("Uttar Pradesh")}
    >
      <title>Uttar Pradesh</title>
    </path>
    {/* Maharashtra */}
    <path
      id="MH"
      className="state-path"
      d="M 406.5 590.5 L 417.5 602.5 L 425.5 617.5 L 438.5 619.5 L 447.5 632.5 L 460.5 633.5 L 470.5 646.5 L 482.5 648.5 L 491.5 661.5 L 504.5 663.5 L 513.5 676.5 L 526.5 678.5 L 535.5 691.5 L 548.5 693.5 L 557.5 706.5 L 570.5 708.5 L 579.5 721.5 L 592.5 723.5 L 601.5 736.5 L 614.5 738.5 L 623.5 751.5 L 636.5 753.5 L 645.5 766.5 L 658.5 768.5 L 667.5 781.5 L 680.5 783.5 L 689.5 796.5 L 702.5 798.5 L 711.5 811.5 L 724.5 813.5 L 733.5 826.5 L 746.5 828.5 L 755.5 841.5"
      onClick={() => onStateClick("Maharashtra")}
    >
      <title>Maharashtra</title>
    </path>
    {/* Rajasthan */}
    <path
      id="RJ"
      className="state-path"
      d="M 251.5 353.5 L 263.5 369.5 L 271.5 384.5 L 284.5 386.5 L 293.5 399.5 L 306.5 401.5 L 315.5 414.5 L 328.5 416.5 L 337.5 429.5 L 350.5 431.5 L 359.5 444.5 L 372.5 446.5 L 381.5 459.5 L 394.5 461.5 L 403.5 474.5 L 416.5 476.5 L 425.5 489.5 L 438.5 491.5 L 447.5 504.5 L 460.5 506.5 L 469.5 519.5 L 482.5 521.5 L 491.5 534.5 L 504.5 536.5 L 513.5 549.5"
      onClick={() => onStateClick("Rajasthan")}
    >
      <title>Rajasthan</title>
    </path>
    {/* Tamil Nadu */}
    <path
      id="TN"
      className="state-path"
      d="M 800.5 800.5 L 812.5 816.5 L 820.5 831.5 L 833.5 833.5 L 842.5 846.5 L 855.5 848.5 L 864.5 861.5 L 877.5 863.5 L 886.5 876.5 L 899.5 878.5 L 908.5 891.5 L 921.5 893.5 L 930.5 906.5 L 943.5 908.5 L 952.5 921.5"
      onClick={() => onStateClick("Tamil Nadu")}
    >
      <title>Tamil Nadu</title>
    </path>
    {/* Add more states here using their real SVG paths */}
  </svg>
);

export default IndiaMap;