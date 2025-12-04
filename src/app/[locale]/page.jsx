import Contacts from '@/components/blocks/contacts'
import Intro from '@/components/blocks/intro'
import Missions from '@/components/blocks/missions'
import PartnersCarousel from '@/components/blocks/partners-carousel'
import Portfolio from '@/components/blocks/portfolio'
import Stats from '@/components/blocks/stats'
import Team from '@/components/blocks/team'

export default function Home() {
	return (
		<>
			<Intro />
			<PartnersCarousel />
			<Stats />
			<Missions />
			<Team />
			<Portfolio />
			{/* <Contacts /> */}
		</>
	)
}
