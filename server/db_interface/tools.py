from django.db.models.fields.files import ImageFieldFile
import pprint
import datetime
import copy
pp = pprint.PrettyPrinter().pprint


def to_dict(instance, fields: list) -> dict:
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    instance_copy = copy.deepcopy(instance.__dict__)

    for key in ['_state', 'hash']:
        if instance_copy.get(key) is not None:
            instance_copy.pop(key)

    if len(fields) == 0:
        return instance_copy
    else:
        new_instance = {}

        for field in fields:
            attr = instance_copy[field[0]]

            if type(attr) is datetime.date:
                attr = attr.__str__()
            elif type(attr) is datetime.datetime:
                attr = int(attr.timestamp())

            new_instance[field[1]] = attr

        return new_instance


def select_from_query(query, fields):
    if len(fields) == 1:
        field = fields[0]
        for obj in query:
            attr = obj.__getattribute__(field[0])
            if type(attr) in [ImageFieldFile, datetime.date]:
                yield attr.__str__()
            else:
                yield attr
    else:
        for obj in query:
            yield to_dict(obj, fields)


def select(model, key, value, fields: list):
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    query = model.objects.filter(**{key: value})
    return select_from_query(query, fields)


def select_single(model, key, value, fields: list):
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    try:
        query = model.objects.filter(**{key: value})
        instances = list(select_from_query(query, fields))
        if len(instances) == 0:
            return None
        else:
            return instances[0]
    except model.DoesNotExist:
        return None
