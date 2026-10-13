/**
 * app/components/ThemeScript.tsx — 첫 페인트 전에 저장된 테마를 <html data-theme>에 적용 (깜빡임 방지)
 * 두 layout의 <head>에서 쓴다. 저장값이 없으면 아무것도 안 해 OS 외관을 따른다.
 */
const code =
  'try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}';

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
