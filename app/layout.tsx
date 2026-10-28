import "./globals.css";

export const metadata = {
  title: "다니엘의 저울",
  description: "학교 학생회 상·벌점 관리 시스템"
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ko"><body>{children}</body></html>;
}
