import React, { useState, useEffect } from 'react'
import Menu from './Menu'
import Categories from './Categories'

const url = "http://localhost:5000/users"

const App = () => {
  const [menuItems, setMenuItems] = useState([])
  const [fullArr, setFullArr] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)


  const filterMenuItems = (category) => {
    if(category === 'all') {
      setMenuItems(fullArr)
      return
    }

    const newItems = fullArr.filter((item) => item.category === category)
    setMenuItems(newItems)
  }

  const fecthUrl = async() => {
    const response = await fetch(url)
    const newMenuItems = await response.json()
    setMenuItems(newMenuItems)
    setFullArr(newMenuItems)
    setLoading(false)
  }

  useEffect(() => {
    fecthUrl()
  }, [])

  useEffect(() => {
    const allCategories = ['all', ...new Set(fullArr.map((item) => item.category))]
    setCategories(allCategories)
  }, [fullArr])

  if(loading) {
    return (
      <main>
        <section className='menu section'>
          <h2>loading...</h2>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className='menu section'>
        <div className='title'>
          <h2>urban menu</h2>
          <div className='underline'></div>
        </div>
        <Categories 
          categories={categories}
          filterItems={filterMenuItems}
        />
        <Menu
          items={menuItems}        
        />
      </section>
    </main>
  )
}

export default App