import { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonButton,
  IonModal,
  IonFooter,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
} from "@ionic/react";
import { chevronBack, close } from "ionicons/icons";
import PreviousKudosGiven from "../components/PreviousKudoEvents";
import { Employee, KudoEvent } from "../../../data/types";
import { getEmployees, getKudos } from "../../../data/dataApi";
import { dismissPlugin } from "../../../data/superAppHandoff";
import format from "date-fns/format";

const Kudos: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [kudos, setKudoEvents] = useState<KudoEvent[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    setPresentingElement(page.current === null ? undefined : page.current);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const e = getEmployees();
      const k = getKudos().sort((a, b) => b.id - a.id); // sort kudos by id descending

      if (isSubscribed) {
        setEmployees(e);
        setKudoEvents(k);
      }
    };

    fetchData().catch(console.error);

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddEntry = (event: any) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const newKudo: KudoEvent = {
      id: kudos[0].id + 1, // grab first kudo (with biggest id) and add 1
      // giver: session.user.id,
      giver: 1,
      receiver: parseInt(formData.get("receiver") as string, 10),
      created_at: format(new Date(), "yyyy-MM-dd"),
      amount: parseInt(formData.get("amount") as string, 10),
      reason: formData.get("reason") as string,
    };

    setKudoEvents([newKudo, ...kudos]); // add new kudo to top of list
    setShowModal(false);
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonButton
              onClick={() => {
                dismissPlugin.dismiss();
              }}
            >
              <IonIcon icon={chevronBack} />
              Hub
            </IonButton>
          </IonButtons>
          <IonTitle>Kudos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Kudos</IonTitle>
          </IonToolbar>
        </IonHeader>

        <PreviousKudosGiven
          employees={employees}
          kudosGiven={kudos}
        ></PreviousKudosGiven>

        <IonModal
          ref={modal}
          isOpen={showModal}
          onDidDismiss={handleCloseModal}
          showBackdrop={true}
          presentingElement={presentingElement}
        >
          <IonHeader className="ion-no-border ios-no-background">
            <IonToolbar>
              <IonTitle>Give Kudos</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={handleCloseModal}>
                  <IonIcon icon={close} slot="start"></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <form ref={formRef} onSubmit={handleAddEntry}>
              <IonList inset={true}>
                <IonItem>
                  <IonSelect
                    label="Give"
                    name="amount"
                    interface="popover"
                    placeholder="Select amount"
                  >
                    {[5, 10, 20, 25, 50, 75, 100].map((amount, i) => (
                      <IonSelectOption key={i}>{amount}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonSelect
                    label="To"
                    name="receiver"
                    placeholder="Select recipient"
                  >
                    {employees.map((e, i) => (
                      <IonSelectOption key={i} value={e.id}>
                        {e.firstName} {e.lastName}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonInput
                    label="For"
                    name="reason"
                    placeholder="Write a few words"
                    style={{ textAlign: "right" }}
                  />
                </IonItem>
                <IonButton strong={true} type="submit" expand="block">
                  Give
                </IonButton>
              </IonList>
            </form>
          </IonContent>
        </IonModal>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton
            onClick={handleOpenModal}
            id="open-entry-modal"
            expand="block"
            style={{ margin: "16px" }}
          >
            Give Kudos
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Kudos;
