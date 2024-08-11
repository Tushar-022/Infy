# import streamlit as st
# import os
# import google.generativeai as genai
# from dotenv import load_dotenv

# load_dotenv()  # Load environment variables

# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# # Initialize the Gemini Pro model
# model = genai.GenerativeModel("gemini-pro")

# def get_gemini_response(question, stage):
#     chat = model.start_chat(history=[])
#     if stage == 1:
#         system_prompt = (
#             "You are a health assistant. First, ask the user to describe their health problem in detail. "
#             "Once the user provides details about their health issue, move on to the next stage to collect information about their lifestyle, diet, and exercise."
#         )
#         chat.send_message(system_prompt)
#     elif stage == 2:
#         system_prompt = (
#             "You are a health assistant. Based on the health problem described by the user, collect detailed information about their daily lifestyle, diet, and exercise plan. "
#             "Based on the collected information, provide personalized suggestions, diet plans, and medication recommendations to help them address their health concerns."
#         )
#         chat.send_message(system_prompt)
    
#     response = chat.send_message(question, stream=True)
#     return response

# # Initialize Streamlit app
# st.set_page_config(page_title="My Health Assistant")

# st.header("My Health Assistant")

# # Initialize session state for chat history and stage if they don't exist
# if 'chat_history' not in st.session_state:
#     st.session_state['chat_history'] = []
# if 'stage' not in st.session_state:
#     st.session_state['stage'] = 1  # Start at stage 1

# def is_health_related(question):
#     health_keywords = ["health", "medical", "doctor", "symptoms", "treatment", "medicine", "diagnosis", "pain", "illness", "condition", "disease", "diet", "exercise"]
#     return any(keyword in question.lower() for keyword in health_keywords)

# input = st.text_input("Input: ", key="input")
# submit = st.button("Submit")

# if submit and input:
#     if is_health_related(input):
#         # Get response based on the current stage
#         response = get_gemini_response(input, st.session_state['stage'])
        
#         # Add user query and response to session state chat history
#         st.session_state['chat_history'].append(("You", input))
#         st.subheader("The Response is")
#         full_response = ""
        
#         if isinstance(response, list):  # Handle non-streaming response (e.g., initial user prompt)
#             for chunk in response:
#                 st.write(chunk)
#                 full_response += chunk
#         else:  # Handle streaming response from Gemini model
#             for chunk in response:
#                 st.write(chunk.text)  # Extract the text from the response object
#                 full_response += chunk.text  # Concatenate the text to full_response
        
#         st.session_state['chat_history'].append(("Bot", full_response))
        
#         # Check if stage needs to be updated
#         if st.session_state['stage'] == 1:
#             # Move to stage 2 after receiving the health problem
#             st.session_state['stage'] = 2
#             st.write("Thank you for describing your health problem. Now, please provide details about your daily lifestyle, diet, and exercise plan.")
#         else:
#             # Optional: Add logic for finishing the conversation or resetting the stage if needed
#             st.write("Thank you for providing your details. Based on the information, here are some recommendations.")
#     else:
#         st.write("Please provide only health-related queries. For example, describe your symptoms, diet, or exercise plan.")

# st.subheader("The Chat History is")
# for role, text in st.session_state['chat_history']:
#     st.write(f"{role}: {text}")


import streamlit as st
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure the API key for Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize the Streamlit app
st.title("Health Assistant Chatbot")

# Initialize the chat history and stage
if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = []
if 'stage' not in st.session_state:
    st.session_state['stage'] = 1

# Function to get a response from the Gemini model
def get_gemini_response(question, stage):
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    chat = model.start_chat(history=st.session_state['chat_history'])
    response = chat.send_message(question)
    return response

# Input box for user queries
user_input = st.text_input("Ask a health-related question:")

if st.button("Submit"):
    if user_input:
        response = get_gemini_response(user_input, st.session_state['stage'])
        st.session_state['chat_history'].append(("You", user_input))
        st.session_state['chat_history'].append(("Bot", response))
        st.write(response)

# Display the chat history
for role, message in st.session_state['chat_history']:
    st.write(f"{role}: {message}")
