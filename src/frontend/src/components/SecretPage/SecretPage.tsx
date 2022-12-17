import React from 'react';

const SecretPage = () => {
    return (
        <>
            <head>
                <meta charSet="UTF-8"/>
                    <meta name="description" content="Front-end and Vue Developer"/>
                        <meta name="keywords" content="resume,cv,Marko Marković"/>
                            <meta name="author" content="Marko Marković"/>
                                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                                    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                                        <link rel="preload" href="https://universal-resume.netlify.app/fonts/FiraGO-Bold.latin.woff2" as="font" crossOrigin="anonymous"/>
                                            <link rel="preload" href="https://universal-resume.netlify.app/fonts/FiraGO-SemiBold.latin.woff2" as="font" crossOrigin="anonymous"/>
                                                <link rel="preload" href="https://universal-resume.netlify.app/fonts/FiraGO-Regular.latin.woff2" as="font" crossOrigin="anonymous"/>
                                                    <link rel="preload" href="https://universal-resume.netlify.app/fonts/FiraGO-Regular.shared.woff2" as="font" crossOrigin="anonymous"/>
                                                        <link rel="preload" href="https://universal-resume.netlify.app/fonts/FiraGO-Medium.latin.woff2" as="font" crossOrigin="anonymous"/>
                                                            <link rel="preload" href="https://universal-resume.netlify.app/fonts/FiraGO-SemiBold.latin-ext.woff2" as="font" crossOrigin="anonymous"/>
                                                                <link href="https://universal-resume.netlify.app/build.css" rel="stylesheet"/>
                                                                    <title>Marko Marković — Resume copy by Anton</title>
            </head>

            <body>
            <main className="font-firago hyphens-manual">

                <div className="p-6 mx-auto page max-w-2xl print:max-w-letter md:max-w-letter md:h-letter xsm:p-8 sm:p-9 md:p-16 bg-white">

                    <header className="flex items-center mb-8 md:mb-11">
                        <div   className="initials-container mr-5 text-base leading-none text-white bg-gray-700 font-medium print:bg-black px-3"
                               style={{
                                   paddingBottom: '0.6875rem',
                                   paddingTop: '0.6875rem',
                               }}>
                            <div className="initial text-center"
                                 style={{paddingBottom: '0.1875rem'}}>
                                M
                            </div>
                            <div className="text-center initial">M</div>
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-750 pb-px">
                            Marko Marković copy by Sergey Solovev
                        </h1>
                    </header>
                    <div className="md:col-count-2 print:col-count-2 col-gap-md md:h-letter-col print:h-letter-col col-fill-auto">

                        <section className="mt-8 first:mt-0">

                            <div className="break-inside-avoid">

                                <h2 className="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
                                    ABOUT ME
                                </h2>

                                <section className="mb-4.5 break-inside-avoid">
                                    <header>
                                        <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                            Technical writer
                                        </h3>
                                        <p className="leading-normal text-md text-gray-650">
                                            Since 2021
                                        </p>
                                    </header>
                                    <p className="mt-2.1 text-md text-gray-700 leading-normal">
                                        Writing some technical blogs on <a href={'https://habr.com/ru/users/AshBlade/'}>Habr</a>.
                                        Main themes are programming and source code exploration.<br/>
                                        Minimal and formal résumé website template for print, mo&shy;bile, and desktop. The proportions are
                                        the same on the screen and paper. Built with amazing <a className="hover:bg-gray-150 rounded-lg transition ease-in duration-100"
                                                                                                href="https://tailwindcss.com/">Tailwind CSS&nbsp;°</a>.
                                    </p>
                                </section>

                            </div>

                            <section className="mb-4.5 break-inside-avoid">
                                <header>
                                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                        Double-End Developer
                                    </h3>
                                    <p className="leading-normal text-md text-gray-650">
                                        Since 100 B. C.
                                    </p>
                                </header>
                                <p className="mt-2.1 text-md text-gray-700 leading-normal">
                                    “docs/index.html” is the main content file. By copying HTML: add pages, sec&shy;tions, subsection, and
                                    other parts.
                                </p>
                                <p className="mt-2.1 text-md text-gray-700 leading-normal">
                                    <span className="font-medium text-gray-600 print:text-black">Important:</span> Too much content on one page
                                    will break the page in the form of additional columns.
                                </p>
                            </section>

                        </section>

                        <section className="mt-8 first:mt-0">

                            <div className="break-inside-avoid">

                                <h2 className="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
                                    EXPERIENCE
                                </h2>

                                <section className="mb-4.5 break-inside-avoid">
                                    <header>
                                        <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                            FooBar LLC.
                                        </h3>
                                        <p className="leading-normal text-md text-gray-650">
                                            Jun 2018 – Present | Web Developer
                                        </p>
                                    </header>
                                    <p className="mt-2.1 text-md text-gray-700 leading-normal">
                                        Writing Python Code &bull; Creating user-hostile interfaces &bull;
                                        Containerization and virtualization
                                        &bull; Want some olivie
                                    </p>
                                </section>

                            </div>

                            <section className="mb-4.5 break-inside-avoid">
                                <header>
                                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                        Anime INC
                                    </h3>
                                    <p className="leading-normal text-md text-gray-650">
                                        Feb 2017 – Apr 2018 | Anime watcher
                                    </p>
                                </header>
                                <ul className="">

                                    <li className="mt-2.1 text-md text-gray-700 leading-normal">
                                        <span className="absolute -ml-3 sm:-ml-3.2 select-none transform -translate-y-px">›</span>
                                        Watch 2 seasons of Evangelion per day. Trying to investigate main meaning of it
                                    </li>
                                    <li className="mt-2.1 text-md text-gray-700 leading-normal">
                                        <span className="absolute -ml-3 sm:-ml-3.2 select-none transform -translate-y-px">›</span>
                                        Reading manga. Creating plot for my own
                                    </li>
                                </ul>
                            </section>

                            <section className="mb-4.5 break-inside-avoid">
                                <header>
                                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                        ASP.NET Core developer
                                    </h3>
                                    <p className="leading-normal text-md text-gray-650">
                                        May 2015 – Dec 2016 | Software QA Specialist
                                    </p>
                                </header>
                                <ul className="">
                                    <li className="mt-2.1 text-md text-gray-700 leading-normal">
                                        <span className="absolute -ml-3 sm:-ml-3.2 select-none transform -translate-y-px">›</span>
                                        Creating simple web sites
                                    </li>
                                    <li className="mt-2.1 text-md text-gray-700 leading-normal">
                                        <span className="absolute -ml-3 sm:-ml-3.2 select-none transform -translate-y-px">›</span>
                                        Disassembling IL code
                                    </li>
                                </ul>
                            </section>

                        </section>

                        <section className="mt-8 first:mt-0">

                            <div className="break-inside-avoid">

                                <h2 className="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
                                    EDUCATION
                                </h2>

                                <section className="mb-4.5 break-inside-avoid">
                                    <header>
                                        <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                            Graz University of Technology
                                        </h3>
                                        <p className="leading-normal text-md text-gray-650">
                                            2014 – 2015 | Master's Degree in Chemistry
                                        </p>
                                    </header>
                                </section>

                            </div>

                            <section className="mb-4.5 break-inside-avoid">
                                <header>
                                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                        Vienna University of Technology
                                    </h3>
                                    <p className="leading-normal text-md text-gray-650">
                                        2010 – 2013 | Bachelor’s Degree in Biology
                                    </p>
                                </header>
                            </section>

                            <section className="mb-4.5 break-inside-avoid">
                                <header>
                                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                        Vienna University of Technology
                                    </h3>
                                    <p className="leading-normal text-md text-gray-650">
                                        2010 – 2013| Bachelor’s Degree in Chemistry
                                    </p>
                                </header>
                            </section>
                        </section>

                        <section className="mt-8 first:mt-0">

                            <div className="break-inside-avoid">

                                <h2 className="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
                                    PROJECTS
                                </h2>

                                <section className="mb-4.5 break-inside-avoid">
                                    <header>
                                        <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                            <a href="https://github.com/WebPraktikos/universal-resume" className="group">
                                                Universal Resume
                                                <span className="inline-block text-gray-550 print:text-black font-normal group-hover:text-gray-700 transition duration-100 ease-in">↗</span>
                                            </a>
                                        </h3>
                                        <p className="leading-normal text-md text-gray-650">
                                            Since 2019 | HTML CSS
                                        </p>
                                    </header>
                                    <p className="mt-2.1 text-md text-gray-700 leading-normal">
                                        Good design is as little design as possible. Less, but better — because it concentrates on the essential
                                        aspects, and the pro&shy;ducts are not burdened with non-essentials.
                                    </p>
                                </section>

                            </div>

                            <section className="mb-4.5 break-inside-avoid">
                                <header>
                                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                        <a href="https://github.com/WebPraktikos/tailwindcss-rich-docs" className="group">
                                            tailwindcss-rich-docs
                                            <span
                                                className="inline-block text-gray-550 print:text-black font-normal group-hover:text-gray-700 transition duration-100 ease-in">↗</span>
                                        </a>
                                    </h3>
                                    <p className="leading-normal text-md text-gray-650">
                                        2017 | JavaScript
                                    </p>
                                </header>
                                <p className="mt-2.1 text-md text-gray-700 leading-normal">
                                    Good design is long-lasting. It avoids being fashionable and therefore never appears antiquated.<br/>
                                    Good design is honest. It does not make a product more innovative, powerful or valuable than it really is.
                                </p>
                            </section>

                            <section className="mb-4.5 break-inside-avoid">
                                <header>
                                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                        Third One
                                    </h3>
                                    <p className="leading-normal text-md text-gray-650">
                                        2013 – 2014 | Vue
                                    </p>
                                </header>
                                <p className="mt-2.1 text-md text-gray-700 leading-normal">
                                    Good design is innovative. Technological development is always offering new opportunities for innovative
                                    design.
                                </p>
                            </section>

                            <section className="mb-4.5 break-inside-avoid">
                                <header>
                                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                        Fantastic Project
                                    </h3>
                                    <p className="leading-normal text-md text-gray-650">
                                        2012 | JavaScript
                                    </p>
                                </header>
                                <p className="mt-2.1 text-md text-gray-700 leading-normal">
                                    Strip steak tail capicola alcatra ground round tenderloin ar. Venison tri-tip porchetta, brisket
                                    tenderloin pig beef.
                                </p>
                            </section>

                        </section>

                        <section className="mt-8 first:mt-0">

                            <div className="break-inside-avoid">

                                <h2 className="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
                                    SKILLS
                                </h2>

                                <section className="mb-4.5 break-inside-avoid">
                                    <header>
                                        <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                            C#
                                        </h3>
                                        <p className="leading-normal text-md text-gray-650">
                                            Middle Level
                                        </p>
                                    </header>
                                    <p className="mt-2.1 text-md text-gray-700 leading-normal">
                                        Good parts: BCL, IL, async programming, Parallel library
                                    </p>
                                    <div className="my-3.2 last:pb-1.5">
                                        <ul className="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
                                            <li
                                                className="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                                                C# 10
                                            </li>
                                            <li
                                                className="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                                                ASP.NET Core
                                            </li>
                                            <li
                                                className="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                                                Async Programming
                                            </li>
                                            <li
                                                className="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                                                Multithreading programming
                                            </li>
                                        </ul>
                                    </div>
                                </section>

                            </div>

                            <section className="mb-4.5 break-inside-avoid">
                                <header>
                                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                                        Python
                                    </h3>
                                </header>
                                <div className="my-3.2 last:pb-1.5">
                                    <ul className="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
                                        <li className="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                                            Python 3.11
                                        </li>
                                        <li className="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                                            CPython
                                        </li>
                                        <li className="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                                            Descriptor protocols
                                        </li>
                                        <li className="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                                            Django
                                        </li>
                                        <li className="px-2.5 mr-1.6 mb-1.6 text-base text-gray-750 print:bg-white print:border-inset bg-gray-200">
                                            FastAPI
                                        </li>
                                    </ul>
                                </div>
                            </section>

                        </section>

                        <section className="mt-8 first:mt-0">

                            <div className="break-inside-avoid">

                                <h2 className="mb-4 font-bold tracking-widest text-sm2 text-gray-550 print:font-normal">
                                    CONTACT
                                </h2>

                                <section className="mb-4.5 break-inside-avoid">
                                    <ul className="list-inside pr-7">
                                        <li className="mt-1.5 leading-normal text-gray-700 text-md">
                                            <a href="https://github.com/AshenBlade" className="group">
                                                GitHub
                                                <span className="inline-block text-gray-550 print:text-black font-normal group-hover:text-gray-700 transition duration-100 ease-in">↗</span>
                                            </a>
                                        </li>
                                        <li className="mt-1.5 leading-normal text-gray-700 text-md">
                                            Moscow, Pushkina st. Kolotushkina h.
                                        </li>
                                        <li className="mt-1.5 leading-normal text-gray-700 text-md">
                                            hello@world.ru
                                        </li>
                                        <li className="mt-1.5 leading-normal text-gray-700 text-md">
                                            8 800 555 35 35
                                        </li>
                                    </ul>
                                </section>

                            </div>

                        </section>

                    </div>
                </div>
            </main>
            </body>
        </>
    );
};

export default SecretPage;
