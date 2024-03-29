import React from 'react'

const FooterNav = ({authenticated, user}) => {
    let authenticatedOptions
    if (user) {
      authenticatedOptions = (
        <ul className="flex flex-wrap items-center mb-2 text-2xl text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                <a href="/about" className="mr-4 hover:underline md:hover:text-sky-700 md:mr-6 ">About</a>
            </li>
            <li>
                <a href={`/cart/${user.id}`} className="mr-4 hover:underline md:hover:text-sky-700 md:mr-6">Cart</a>
            </li>
            <li>
                <a href={`/favorite/${user.id}`} className="mr-4 hover:underline md:hover:text-sky-700 md:mr-6 ">Favorites</a>
            </li>
            <li>
                <a href={`/settings/${user.id}`} className="hover:underline md:hover:text-sky-700">Settings</a>
            </li>
        </ul>
        
      )}

      const publicOptions = (
        <ul className="flex flex-wrap items-center mb-2 text-2xl font-medium  sm:mb-0 dark:text-gray-400">
            <li>
            <a href="/about" className="mr-4 hover:underline md:hover:text-sky-700 md:mr-6 ">About</a>
            </li>
            <li>
            <a href='/login' className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:underline md:hover:text-sky-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"> Login </a>
            </li>
        </ul>
    )
  return (
  <div>
    <footer className="p-4 bg-white shadow md:px-6 md:py-4 dark:bg-gray-900">
    <div className="sm:flex sm:items-center sm:justify-between">
    <a href="/" className="flex items-center mb-2 sm:mb-0">
                <img src="https://i.imgur.com/1ZSRrmo.png" className="h-6 mr-5 sm:h-9" alt="Magical Recipes logo" />
                <span className="self-center text-4xl whitespace-nowrap dark:text-white nav-font h-6">Magical Recipes</span>
            </a>
        {authenticated && user ? authenticatedOptions : publicOptions}

    </div>
    <hr className="mt-2 mb-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-2" />
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/" className="hover:underline">Magical Meals™</a>. All Rights Reserved.
    </span>
</footer>

  </div>
    )
}

export default FooterNav
