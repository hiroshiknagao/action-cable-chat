import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static targets = ["messages"]
  static values = { chatroomId: Number, currentUserId: Number }
  connect() { console.log(`Subscribe to the chatroom with the id ${this.chatroomIdValue}.`)
    this.channel = createConsumer().subscriptions.create(
      { channel: "ChatroomChannel", id: this.chatroomIdValue },
    { received: (data) => this.#insertMessageAndScrollDown(data) }
  );
  }

  disconnect() {
    console.log("Discconecting from the channels....")

    this.channel.unsubscribe()
  }

  resetForm(event) {
    event.target.reset()
    form.reset()
  }

  #insertMessageAndScrollDown(data) {
    const currentUserIsSender = this.currentUserIdValue === data.sender_id
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }

  #buildMesssageElement(currentUserIsSender, message) {
    return `
      <div class="message-row d-flex
    ${this.#justifyClass(currentUserIsSender)}">
        <div
    class="${this.#userStyleClass(currentUserIsSender)}">
      ${message}
    </div>
  </div>
  `
  }

  #justifyClass(currentUserIsSender) {
    return currentUserIsSender ? "justify-content-end" : "justify-content-start"
  }

  #userStyleClass(currentUserIsSender) {
    return currentUserIsSender ? "sender-style" : "receiver-style"
  }
}
