import { IonList, IonItem, IonLabel, IonAvatar } from "@ionic/react";
import { Employee, KudoEvent } from "../../../data/types";
import { parse } from "date-fns";

const PreviousKudosGiven: React.FC<{
  employees: Employee[];
  kudosGiven: KudoEvent[];
}> = ({ employees, kudosGiven }) => {
  return (
    <IonList inset={true}>
      {kudosGiven.map((kudoEvent) => {
        const givingEmployee = employees.find((e) => e.id === kudoEvent.giver);
        const receivingEmployee = employees.find(
          (e) => e.id === kudoEvent.receiver
        );
        // console.log(givingEmployee, receivingEmployee, employees, kudoEvent);

        const date = parse(
          kudoEvent.created_at,
          "yyyy-MM-dd",
          new Date()
        ).toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return (
          <IonItem button detail={false} lines="full" key={kudoEvent.id}>
            <IonAvatar slot="start">
              <img
                alt="Employee's picture"
                src={receivingEmployee?.images.thumbnail}
              />
            </IonAvatar>
            <IonLabel>
              <h3 style={{ whiteSpace: "break-spaces", fontWeight: "600" }}>
                {`${givingEmployee?.firstName} ${givingEmployee?.lastName} gave ${receivingEmployee?.firstName} ${receivingEmployee?.lastName}`}
                &nbsp;
                <span style={{ color: "var(--ion-color-success)" }}>
                  +{kudoEvent.amount}
                </span>{" "}
                for {kudoEvent.reason}
              </h3>
              <p>{date}</p>
            </IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default PreviousKudosGiven;
