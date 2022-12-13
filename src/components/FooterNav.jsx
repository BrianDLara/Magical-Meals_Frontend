import React from 'react'

const FooterNav = ({authenticated, user}) => {
    let authenticatedOptions
    if (user) {
      authenticatedOptions = (
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
                <a href="#" class="hover:underline">Contact</a>
            </li>
        </ul>
        
      )}

      const publicOptions = (
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
            <a href="/about" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
        </ul>
    )
  return (
  <div>
    <footer class="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-gray-900">
    <div class="sm:flex sm:items-center sm:justify-between">
    <a href="/" class="flex items-center mb-4 sm:mb-0">
                <img src="https://i.imgur.com/1ZSRrmo.png" className="h-6 mr-5 sm:h-9" alt="Magical Recipes logo" />
                <span className="self-center text-4xl whitespace-nowrap dark:text-white nav-font h-6">Magical Recipes</span>
            </a>
        {authenticated && user ? authenticatedOptions : publicOptions}

    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://flowbite.com/" class="hover:underline">Magical Meals™</a>. All Rights Reserved.
    </span>
</footer>

  </div>
    )
}

export default FooterNav
