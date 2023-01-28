import { useEffect, useState } from "react"
import SmoothieCard from "../components/SmoothieCard"
import supabase from "../config/supabaseConfigClient"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {

      let { data: smoothies, error } = await supabase
        .from('smoothies')
        .select('*')

      if (error) {
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
        console.log(error)
      }

      if (smoothies) {
        setSmoothies(smoothies)
        setFetchError(null)
        console.log(smoothies)
      }


    }
    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home