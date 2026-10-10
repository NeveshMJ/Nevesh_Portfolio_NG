import './Orb.css'

/** The signature 3D orb. Lives in a 380×380 box; `sceneRef` lets a parent tilt it via --rx / --ry. */
export default function Orb({ sceneRef }) {
  return (
    <>
      <span className="orb-halo" />
      <span className="orb-halo orb-halo-2" />
      <div className="orb-core" />
      <div className="orb-scene" ref={sceneRef}>
        <div className="orb">
          {Array.from({ length: 8 }, (_, i) => <span key={i} className="orb-m" style={{ '--i': i }} />)}
          {[-0.7, -0.35, 0, 0.35, 0.7].map((t) => <span key={t} className="orb-l" style={{ '--t': t, '--k': Math.sqrt(1 - t * t) }} />)}
        </div>
        <div className="orb-orbit"><span className="orb-sat" /></div>
        <div className="orb-orbit orb-orbit-2"><span className="orb-sat" /></div>
      </div>
      <div className="orb-floor" />
    </>
  )
}
