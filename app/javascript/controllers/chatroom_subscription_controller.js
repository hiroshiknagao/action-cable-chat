import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = { chatroomId: Number }
  static targets = ["messages"]
  connect() { console.log(`Subscribe to the chatroom with the id ${this.chatroomIdValue}.`)
    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
    {
      received: (data) => this.messagesTarget.insertAdjacentHTML("beforeend", data) }
  );

  }
}
