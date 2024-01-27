"use client";
import Navbar from "@/src/components/Navbar";
import "./globals.css";
import Context from "@/src/Context/Context";
import { usePathname } from "next/navigation";
import Dnavbar from "../components/Dnavbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  var pathname = usePathname();



  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>

      <body>
        
        <Context>
       
          {pathname.startsWith("/admin") ? 

          // Dashboard Layout
          <>
          
            <div className=" flex-col  h-screen overflow-hidden">
                <nav className="bg-gray-100">
                  <Dnavbar  />
                </nav>
              <div className="flex border h-[calc(100vh-90px)] flex-1 ">
                <aside className="w-44 bg-gray-100">
                  <Sidebar />
                </aside>
                <main className="flex-1 border p-2 ">
                  <div className="overflow-auto h-full ">{children}</div>
                </main>
              </div>
            </div>
            
            
            </>
           : 
            //  Public Layout
            <>
              <Navbar />
              {children}
            </>
          }
          
        </Context>
        
      </body>
    </html>
  );
}
