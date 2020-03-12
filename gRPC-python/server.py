import logging
from concurrent import futures

import grpc

import myProto_pb2
import myProto_pb2_grpc


class CoffeeTypesServicer(myProto_pb2_grpc.CoffeeTypesServicer):
    def GetOneCoffeeType(self, request, context):
        print(request)
        return myProto_pb2.CoffeeType(name="Mocha Latte")

    def GetMultipleCoffeeTypes(self, request, context):
        coffeeTypes = [
            "Mocha Latte",
            "Cappuccino",
            "Chai Latte",
            "Espresso",
            "Hot Chocolate",
            "Milk",
        ]
        for x in coffeeTypes:
            yield myProto_pb2.CoffeeType(name=x)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    myProto_pb2_grpc.add_CoffeeTypesServicer_to_server(CoffeeTypesServicer(), server)
    server.add_insecure_port("[::]:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    serve()
