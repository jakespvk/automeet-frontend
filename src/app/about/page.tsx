export default function About() {
  return (
    <>

      <div className="max-w-screen h-24"></div>
      <div className="px-5 min-w-fit sm:px-10 md:px-auto pb-20">
        <div className="flex justify-center overflow-hidden">
          <iframe className="pb-5 rounded-sm max-w-4/5 w-[250px] h-[140px] min-[415px]:w-[375px] min-[415px]:h-[211px] sm:w-[560px] sm:h-[315px] xl:w-[1050px] xl:h-[590px] min-[1800px]:w-[1600px] min-[1800px]:h-[900px]" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className="flex justify-center overflow-hidden pt-5">
          <p className="text-gray-200 pb-5 max-w-7xl text-center text-pretty">
            Automeet aims to put your people together. Leveraging the power of Large-Language Models, Automeet reads descriptions of your customers
            and creates groups of people who are compatible with each other. Effectively, automating the process of matching people with similar
            interests and needs.
          </p>
        </div>
      </div>
    </>
  )
}
