/**
 * app/components/MetaPixel.tsx — Meta 광고 방문 측정 Pixel
 * Pixel ID는 Meta 이벤트 관리자에서 발급됐으며 이슈 #3을 따른다.
 */
import Script from "next/script";

export default function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2032805160704268');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- Meta 기본 코드의 noscript 픽셀이라 next/image 대상이 아니다 */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=2032805160704268&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
}
