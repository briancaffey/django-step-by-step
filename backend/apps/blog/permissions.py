from rest_framework import permissions


class PostPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        is_object_owner = request.user == obj.created_by
        if view.action == "retrieve":
            return True

        if view.action == "destroy":
            return is_object_owner

        if view.action in ["update", "partial_update"]:
            return is_object_owner

        if view.action == "like":
            print("like action...")
            return request.user.is_authenticated

    def has_permission(self, request, view):

        # anyone can list posts
        if view.action == "list":
            return True

        # anyone can create a post
        if view.action == "create":
            return True

        return True
