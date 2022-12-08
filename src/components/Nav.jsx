import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (   
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
            <a href="#" class="flex items-center">
                <img src="https://i.imgur.com/1ZSRrmo.png" class="h-6 mr-5 sm:h-9" alt="Magical Recipes logo" />
                <span class="self-center text-4xl whitespace-nowrap dark:text-white font-1 h-6">Magical Recipes</span>
            </a>
            
            <label class="w-full block  md:w-auto" id="navbar-default">
                <input type="checkbox" className='menu_toggle'></input>
                <span className="menu"> <span className="hamburger"></span> </span>
                
                <ul class="navbar-nav nav-items-ul flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 top-48 md:inset-auto">
                    <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
                    </li>
                    <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Favorites</a>
                    </li>
                    <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart</a>
                    </li>
                    <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                    </li>
                </ul>
            </label>
        </div>
    </nav>

  )
}

export default Nav
