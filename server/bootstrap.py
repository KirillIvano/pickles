import dotenv

def bootstrap():
    print(dotenv.find_dotenv())
    print('x')
    dotenv.load_dotenv(
        dotenv.find_dotenv()
    )