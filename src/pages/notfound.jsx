import React from "react"
import LogoImage from "./../assets/logo-hd.webp"

const Notfound = () => {
  return (
    <div className="mt-[10vh] max-w-[50rem] flex flex-col m-auto w-full h-full justify-center items-center">
      <div className="mx-auto text-center">
        {/* <!-- ========== HEADER ========== --> */}
        <header className="mb-auto flex justify-center z-50 w-full py-4">
          <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
            <a
              className="flex-none text-xl font-semibold sm:text-3xl dark:text-white"
              href="#"
              aria-label="Brand"
            >
              <section className="grid justify-items-center">
                <img
                  src={LogoImage}
                  className="w-auto h-auto text-center"
                  alt="logo"
                />
              </section>
            </a>
          </nav>
        </header>
        {/* <!-- ========== END HEADER ========== --> */}

        {/* <!-- ========== MAIN CONTENT ========== --> */}
        <main id="content" role="main">
          <div className="text-center p-4 sm:px-6 lg:px-8">
            <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">
              404
            </h1>
            <h1 className="block text-2xl font-bold text-white"></h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Oops, something went wrong.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Sorry, we couldn't find your page.
            </p>
          </div>
        </main>
        {/* <!-- ========== END MAIN CONTENT ========== --> */}

        {/* <!-- ========== FOOTER ========== --> */}
        <footer className="mt-auto text-center py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-gray-500">
              © All Rights Reserved. 2022.
            </p>
          </div>
        </footer>
        {/* <!-- ========== END FOOTER ========== --> */}
      </div>
    </div>
  )
}

export default Notfound
