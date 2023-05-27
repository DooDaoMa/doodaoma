import { Section } from './Section'

export const TelescopeSection = () => {
  const mockTelescope = [
    {
      deviceId: 1,
      name: 'telescope 1',
      description: 'description 1',
      isConnected: false,
    },
    {
      deviceId: 2,
      name: 'telescope 2',
      description: 'description 2',
      isConnected: true,
    },
    {
      deviceId: 3,
      name: 'telescope 3',
      description: 'description 3',
      isConnected: false,
    },
  ]
  return (
    <Section className="col-start-3 row-start-3">
      <>
        <div className="feed-card-header">Available Telescope</div>
        <ul>
          {mockTelescope
            .filter((ele) => !ele.isConnected)
            .map((ele) => (
              <li key={ele.deviceId}>{ele.name}</li>
            ))}
        </ul>
      </>
    </Section>
  )
}
