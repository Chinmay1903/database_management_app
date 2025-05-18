from rest_framework import serializers  # Import serializers from DRF
from .models import Record  # Import the Record model
from django.contrib.auth import get_user_model  # Import function to get the User model

User = get_user_model()  # Get the currently active User model

# Serializer for the Record model
class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record  # Specify the model to serialize
        fields = '__all__'  # Serialize all fields of the model

# Serializer for the User model (for registration)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # Specify the User model
        fields = ('id', 'username', 'email', 'password')  # Fields to include in serialization
        extra_kwargs = {
            'password': {'write_only': True}  # Password should only be used for write operations
        }

    # Override the create method to handle user creation
    def create(self, validated_data):
        user = User(
            username=validated_data['username'],  # Set username
            email=validated_data['email'],        # Set email
        )
        user.set_password(validated_data['password']) # Hash the password
        user.is_active = True  # Ensure the user is active
        user.save() # Save the user instance
        return user  # Return the created user instance