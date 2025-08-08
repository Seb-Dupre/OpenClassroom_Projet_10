import { useEffect, useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { getMonth } from '../../helpers/Date'

import './style.scss'

const Slider = () => {
  const { data } = useData()
  const [index, setIndex] = useState(0)

  // Affichage des événements par date décroissante (plus récent en premier)
  const byDateDesc = data?.focus
    ?.slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  // useInterval plutot ?
  useEffect(() => {
    const timer = setTimeout(() => {
      if (byDateDesc && byDateDesc.length > 0) {
        setIndex(prevIndex => (prevIndex + 1) % byDateDesc.length)
      }
    }, 5000)

    return () => clearTimeout(timer) // Nettoyage du timer afin d'evité des memory leak
  }, [index, byDateDesc])

  return (
    <div className='SlideCardList'>
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? 'display' : 'hide'
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className='SlideCard__descriptionContainer'>
              <div className='SlideCard__description'>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          {/* Pagination visible uniquement pour la slide active */}
          {index === idx && (
            <div className='SlideCard__paginationContainer'>
              <div className='SlideCard__pagination'>
                {byDateDesc.map(eventItem => (
                  <input
                    key={`radio-${eventItem.title}`}
                    type='radio'
                    name={`pagination-${event.title}`}
                    checked={index === byDateDesc.indexOf(eventItem)}
                    readOnly
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Slider
