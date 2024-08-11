import streamlit as st
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to extract text from PDF files
def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

# Function to split the text into chunks for processing
def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

# Function to create and save vector store from text chunks
def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index")

# Function to get the question-answering chain
def get_conversational_chain():
    prompt_template = """
    You are an AI medical assistant. Your task is to answer questions and generate solutions for the patient based on the provided context.
    
    Context:
    {context}

    Question:
    {question}
    
    If the patient-specific details are not provided in the context, use your medical knowledge to generate a general solution or advice based on common practices. Be sure to address the question fully and offer practical guidance or next steps.

    Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

# Function to handle user input and process the question
def user_input(user_question):
    try:
        # Load embeddings and FAISS index
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
        
        # Search the PDF-based vector store for relevant documents
        docs = new_db.similarity_search(user_question)

        # If relevant context is found in the PDFs, use the QA chain
        if docs:
            chain = get_conversational_chain()
            response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)
            return response["output_text"]

    except Exception as e:
        st.error(f"Error processing PDF content: {e}")
    
    # If no context is found in PDFs or an error occurs, use direct Gemini model response
    st.info("No relevant context found in the uploaded reports, generating a response using the AI model.")
    response = get_gemini_response(user_question)
    return response

# Function to get a response from the Gemini model directly
def get_gemini_response(question):
    model = genai.GenerativeModel("gemini-pro")
    chat = model.start_chat(history=[])
    response = chat.send_message(question, stream=True)
    return ''.join([chunk.text for chunk in response])

# Initialize the Streamlit app
st.set_page_config(page_title="Chat with Your Doctor")
st.header("Chat with Your Doctor by Uploading a Report")

# Initialize session state for chat history if it doesn't exist
if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = []

# Sidebar for uploading PDF files
with st.sidebar:
    st.title("Menu:")
    pdf_docs = st.file_uploader("Upload your PDF Files and Click on the Submit & Process Button", accept_multiple_files=True)
    if st.button("Submit & Process"):
        if pdf_docs:
            with st.spinner("Processing..."):
                raw_text = get_pdf_text(pdf_docs)
                text_chunks = get_text_chunks(raw_text)
                get_vector_store(text_chunks)
                st.success("Processing completed successfully!")
        else:
            st.warning("Please upload PDF files before processing.")

# Single input box for asking questions
user_question = st.text_input("Ask a Question (related to the report or general)")
if st.button("Submit Question"):
    if user_question:
        response = user_input(user_question)
        st.session_state['chat_history'].append(("You", user_question))
        st.session_state['chat_history'].append(("Bot", response))
        st.subheader("The Response is")
        st.write(response)

# Display chat history
st.subheader("Chat History")
for role, text in st.session_state['chat_history']:
    st.write(f"{role}: {text}")
