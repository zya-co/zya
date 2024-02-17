import styles from './Affiliation.module.css'
import Image from 'next/image';
import Button from '../Button';

export default function Affiliation(props) {
  return (
    <section className={styles.affiliation}>
      <h3 className={styles.affilationHead}>{props.data.affilationHead}</h3>
      <div className={styles.collaborators}>
        {props.data.collaborators?.map((collaborator, index) => { 
          return (
            <div key={index} className={styles.collaborator}>
              { collaborator.collaboratorLogo && (
                <div className={styles.collaboratorLogo}>
                  <Image
                    src={collaborator.collaboratorLogo}
                    alt={`Logo of ${collaborator.name}`}
                    sizes='(min-width: 641px) 45vw, 100vw'
                    fill={true}
                  />
                </div>
              )}
              <div className={styles.collaboratorInfo}>
                <h4 className={styles.collaboratorInfo__name}>{collaborator.collaboratorName}</h4>
                <p className={styles.collaboratorInfo__description}>{collaborator.collaboratorDescription}</p>
              </div>
              { collaborator.collaboratorButton?.link && (
                <Button href={collaborator.collaboratorButton.link} className={styles.collaboratorButton} variant="mini" color="lichen">
                  { collaborator.collaboratorButton.label || 'Connect' }
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.backers}>
        {props.data.backers?.map((backer, index) => { 
          return (
            <div key={index} className={styles.backer}>
              { backer.backerLogo && (
                <div className={styles.backerLogo}>
                  <Image
                    src={backer.backerLogo}
                    alt={`Logo of ${backer.name}`}
                    sizes='(min-width: 641px) 45vw, 100vw'
                    fill={true}
                  />
                </div>
              )}
            </div>
          );
        })
        }
      </div>
    </section>
  )
}