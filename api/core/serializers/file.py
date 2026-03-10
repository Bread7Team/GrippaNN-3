from rest_framework import serializers
from core.models import File


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'employee', 'title', 'file', 'uploaded_at', 'deleted_at']
        read_only_fields = ['id', 'uploaded_at', 'deleted_at']

    def validate_file(self, value):
        # Лимит 5 MB
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("Размер файла не должен превышать 5 MB.")
        
        # Разрешенные расширения
        ext = value.name.split('.')[-1].lower()
        if ext not in ['jpg', 'jpeg', 'png', 'pdf']:
            raise serializers.ValidationError("Разрешены только файлы JPG, PNG и PDF.")
        
        return value
